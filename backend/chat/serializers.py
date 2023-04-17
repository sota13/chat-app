from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Room, GroupMessage, Category
from authentication.serializers import UserSerializer, ShortUserSerializer


User = get_user_model()


class GroupMessageSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    room = serializers.SerializerMethodField()
    read_by = serializers.SerializerMethodField()

    class Meta:
        model = GroupMessage
        fields = (
            "id",
            "room",
            "author",
            "content",
            "timestamp",
            "read_by",
        )

    def create(self, validated_data):
        user = self.context.get('user')
        data = validated_data.pop('data')
        content = data.get("content")
        room_id = data.get("room_id")
        room = Room.objects.get(id=room_id)
        new_msg = GroupMessage()
        new_msg.room = room
        new_msg.author = user
        new_msg.content = content
        new_msg.save()
        new_msg.read_by.add(user)
        return new_msg

    def get_room(self, obj):
        return str(obj.room.id)

    def get_author(self, obj):
        return ShortUserSerializer(obj.author).data

    def get_read_by(self, obj):
        readers = obj.read_by.all()
        return ShortUserSerializer(readers, many=True).data

class ShortGroupMessageSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    room = serializers.SerializerMethodField()

    class Meta:
        model = GroupMessage
        fields = (
            "id",
            "room",
            "author",
            "content",
            "timestamp",
        )


    def get_room(self, obj):
        room = {
            "id":obj.room.id,
            "name":obj.room.name,
        }
        return room

    def get_author(self, obj):
        return ShortUserSerializer(obj.author).data



class RoomSerializer(serializers.ModelSerializer):
    participants = serializers.SerializerMethodField()
    last_message = serializers.SerializerMethodField()
    category = serializers.StringRelatedField()

    class Meta:
        model = Room
        fields = ("id", "name", "description", "category", "participants", "last_message")

    def create(self, validated_data):
        user = self.context.get('user')
        data = validated_data.pop('data')
        room_name = data.get("name")
        description = data.get("description",'')
        category_name = data.get("category_name")
        category, created = Category.objects.get_or_create(name=category_name)
        new_room = Room()
        new_room.name = room_name
        new_room.description = description
        new_room.category = category
        new_room.created_by = user
        new_room.save()
        return new_room

    def get_last_message(self, obj):
        messages = obj.messages.all().order_by("-timestamp")
        if not messages.exists():
            return None
        message = messages[0]
        return GroupMessageSerializer(message).data

    def get_participants(self, obj):
        participants = obj.online.all()
        return UserSerializer(participants, many=True).data
    


class RoomDetailSerializer(serializers.ModelSerializer):
    participants = serializers.SerializerMethodField()
    last_messages = serializers.SerializerMethodField()

    class Meta:
        model = Room
        fields = ("id", "name", "description", "participants", "last_messages")

    def get_last_messages(self, obj):
        messages = obj.messages.all().order_by("timestamp")[:50]
        # if not messages.exists():
        #     return None
        return GroupMessageSerializer(messages, many=True).data

    def get_participants(self, obj):
        participants = obj.online.all()
        return ShortUserSerializer(participants, many=True).data
