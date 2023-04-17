from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from .models import Room, GroupMessage
from .serializers import GroupMessageSerializer, RoomSerializer, RoomDetailSerializer, ShortGroupMessageSerializer


class RoomList(APIView):
    """
    get all rooms or create new rooms
    
    """
    def get(self, request):
        rooms = Room.objects.all()
        messages = GroupMessage.objects.all().order_by("-timestamp")[0:3]
        room_serializer = RoomSerializer(rooms, many=True)
        message_serializer = ShortGroupMessageSerializer(messages, many=True)
        data = {
            "rooms":room_serializer.data,
            "last_messages":message_serializer.data
        }
        return Response(data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = RoomSerializer(data=request.data, context={
            'user': request.user})
        if serializer.is_valid():
            serializer.save(data=request.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RoomDetail(APIView):
    """
    Update and deleta rooms.
    """
    def get_object(self, pk):
        try:
            return Room.objects.get(id=pk)
        except Room.DoesNotExist:
            raise Http404
        
    def get(self, request, pk):
        room = self.get_object(pk)
        serializer = RoomDetailSerializer(room)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def patch(self, request, pk):
        room = self.get_object(pk)
        serializer = RoomSerializer(
            room, data=request.data)
        if serializer.is_valid():
            serializer.save(data=request.data)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        room = self.get_object(pk)
        room.delete()
        return Response(pk)


class GroupMessageList(APIView):
     """
        get all rooms or create new rooms
    
     """
     def get(self, request):
        messages = GroupMessage.objects.all()
        serializer = GroupMessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
     
     def post(self, request):
        serializer = GroupMessageSerializer(data=request.data, context={
            'user': request.user})
        if serializer.is_valid():
            serializer.save(data=request.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserMessages(APIView):
    """
    get last user messages
    
    """
    def get(self, request):
        messages = GroupMessage.objects.filter(author=request.user).order_by("-timestamp")[0:10]
        message_serializer = ShortGroupMessageSerializer(messages, many=True)
        return Response(message_serializer.data, status=status.HTTP_200_OK)