from django.contrib import admin
from .models import Room, GroupMessage, Category


admin.site.register(Category)
admin.site.register(Room)
admin.site.register(GroupMessage)
