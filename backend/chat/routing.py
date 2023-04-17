# chat/routing.py
from django.urls import re_path

from .consumers import ChatConsumer, NotificationConsumer

websocket_urlpatterns = [
    re_path(r"ws/chat/(?P<room_id>\w+)/$", ChatConsumer.as_asgi()),
    re_path(r"ws/notifications/$", NotificationConsumer.as_asgi()),
]