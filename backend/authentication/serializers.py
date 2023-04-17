from django.contrib.auth.models import update_last_login
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, CharField ,SerializerMethodField, Serializer, EmailField, IntegerField, StringRelatedField
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework.exceptions import AuthenticationFailed
from .models import UserProfile
from django.contrib.auth import authenticate, get_user_model

User = get_user_model()

class PasswordField(CharField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault("style", {})

        kwargs["style"]["input_type"] = "password"
        kwargs["write_only"] = True

        super().__init__(*args, **kwargs)


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ['id','first_name', 'last_name', 'bio', 'phone_number', 'gender', 'avatar']





class EditProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField(read_only=True)
    phone_number = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = UserProfile
        fields = ['id','first_name', 'last_name', 'bio', 'avatar', 'phone_number', 'gender']



    def get_avatar(self, obj):
        return obj.get_avatar_url

    def get_phone_number(self, obj):
        return obj.phone_number

    def update(self, instance, validated_data):
        data = validated_data.pop('data')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        bio = data.get('bio','')
        phone_number = data.get('phone_number','')
        gender = data.get('gender','')
        avatar = data.get('avatar', '')
        instance.first_name = first_name
        instance.last_name = last_name
        instance.bio = bio
        instance.gender = gender
        if avatar:
            instance.avatar = avatar
        if phone_number:
            instance.phone_number = phone_number
        instance.save()
        return instance



class UserSerializer(ModelSerializer):
    profile = SerializerMethodField(read_only=True)
    name = SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'is_admin', 'profile']

    def get_name(self, obj):
        return f"{obj.userprofile.first_name} {obj.userprofile.last_name}"

    def get_profile(self, obj):
        return UserProfileSerializer(obj.userprofile).data
    

class ShortUserSerializer(ModelSerializer):
    avatar = SerializerMethodField(read_only=True)
    name = SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'is_admin', 'avatar']

    def get_name(self, obj):
        return f"{obj.userprofile.first_name} {obj.userprofile.last_name}"

    def get_avatar(self, obj):
        return obj.userprofile.get_avatar_url



class UserSerializerWithToken(ModelSerializer):
    token = SerializerMethodField(read_only=True)
    profile = SerializerMethodField(read_only=True)
    name = SerializerMethodField(read_only=True)
    

    class Meta:
        model = User
        fields = ['id','email', 'name', 'is_admin', 'profile', 'token']

    def get_name(self, obj):
        if not obj.userprofile.first_name or not obj.userprofile.last_name:
            return 'nameles user'
        return f"{obj.userprofile.first_name} {obj.userprofile.last_name}"

    def get_profile(self, obj):
        return UserProfileSerializer(obj.userprofile).data


    def get_token(self, obj):
        refresh = RefreshToken.for_user(obj)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }


class MyTokenSerializer(Serializer):
    username_field = get_user_model().USERNAME_FIELD
    @classmethod
    def get_token(cls, user):
        token = RefreshToken.for_user(user)

        # Add custom claims
        #token['first_name'] = user.first_name
        #token['last_name'] = user.last_name
        # ...

        return token

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields[self.username_field] = CharField()
        self.fields["password"] = PasswordField()
        

    def validate(self, attrs):
        authenticate_kwargs = {
            self.username_field: attrs[self.username_field],
            "password": attrs["password"],
        }
        try:
            authenticate_kwargs["request"] = self.context["request"]
        except KeyError:
            pass

        self.user = authenticate(**authenticate_kwargs)

        refresh = self.get_token(self.user)

        token = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

        data = {}

        serializer = UserSerializer(self.user).data
        for k, v in serializer.items():
            data[k] = v

        data['token'] = token

        update_last_login(None, self.user)

        return data


        
class ResetPasswordEmailRequestSerializer(Serializer):
    email = EmailField(min_length=2)

    redirect_url = CharField(max_length=500, required=False)

    class Meta:
        fields = ['email']


class SetNewPasswordSerializer(Serializer):
    password = CharField(
        min_length=6, max_length=68, write_only=True)
    token = CharField(
        min_length=1, write_only=True)
    uidb64 = CharField(
        min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)

            user.set_password(password)
            user.save()

            return (user)
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)

