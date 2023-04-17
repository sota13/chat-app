from django.urls import path
from .views import RoomList, GroupMessageList, RoomDetail, UserMessages


urlpatterns = [
    path("rooms/", RoomList.as_view()),
    path("rooms/<int:pk>/", RoomDetail.as_view()),
    path("group-messages/", GroupMessageList.as_view()),
    path("user-messages/", UserMessages.as_view()),
]


