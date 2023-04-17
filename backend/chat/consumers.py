import django
django.setup()

from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Room
from .serializers import RoomDetailSerializer, GroupMessageSerializer
from authentication.serializers import ShortUserSerializer


class ChatConsumer(AsyncJsonWebsocketConsumer):

    @database_sync_to_async
    def serialize_user(self):
        serializer = ShortUserSerializer(self.user)
        return serializer.data

    @database_sync_to_async
    def get_room(self,room_id):
        room = Room.objects.get(id=room_id)
        return room
    
    @database_sync_to_async
    def serialize_room(self):
        serializer = RoomDetailSerializer(self.room)
        return serializer.data
    
    @database_sync_to_async
    def create_message(self, data):
        serializer = GroupMessageSerializer(data=data, context={
            'user': self.user})
        if serializer.is_valid():
            serializer.save(data=data)
        return serializer.data

    @database_sync_to_async
    def join_room(self):
        self.room.online.add(self.user)

    @database_sync_to_async
    def leave_room(self):
        self.room.online.remove(self.user)


    async def connect(self):
        self.user = self.scope["user"]
        if not self.user.is_authenticated:
            return
        
        self.room_id = self.scope["url_route"]["kwargs"]["room_id"]
        self.group_name = "chat_%s" % self.room_id

        # Join room group
        await self.channel_layer.group_add(self.group_name, self.channel_name)

        await self.accept()

        self.serializered_user = await self.serialize_user()
        self.room = await self.get_room(self.room_id)
        self.serializered_room = await self.serialize_room()

        await self.join_room()


        await self.send_json({
            "type":"room_details",
            "room":self.serializered_room
        })

        await self.channel_layer.group_send(
            self.group_name,
            {
                "type": "user_join",
                "user": self.serializered_user,
            },
        )

        print(f"{self.user.email} connected! and joined room {self.group_name}")

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_send(
                self.group_name,
                {
                    "type": "user_leave",
                    "user_id": self.user.id,
                },
            )
        await self.channel_layer.group_discard(self.group_name, self.channel_name)
        await self.leave_room()

    

    # Receive json message from WebSocket
    async def receive_json(self, payload, **kwargs):
        message_type = payload["type"]
        

        if message_type == "chat_message":
            message_content=payload["data"]
            print(message_content)
            # Send json message to room group
            message = await self.create_message(message_content)
            await self.channel_layer.group_send(
            self.group_name, 
            {"type": "chat_message_echo", "message": message}
            )

    

    # Receive json message from room group
    async def chat_message_echo(self, event):
        await self.send_json(event)

    async def user_join(self, event):
        await self.send_json(event)

    async def user_leave(self, event):
        await self.send_json(event)


class NotificationConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self):
        self.user = self.scope["user"]
        if not self.user.is_authenticated:
            return

        await self.accept()
        print(f"{self.user.email} connected!")

        # private notification group
        self.notification_group_name = str(self.user.id) + "__notifications"
        await self.channel_layer.group_add(
            self.notification_group_name,
            self.channel_name,
        )

        

    async def disconnect(self, code):
        await self.channel_layer.group_discard(
            self.notification_group_name,
            self.channel_name,
        )
        return await super().disconnect(code)


