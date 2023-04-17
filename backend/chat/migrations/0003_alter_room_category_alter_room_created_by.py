# Generated by Django 4.1.7 on 2023-04-12 18:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chat', '0002_category_room_created_by_room_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rooms', to='chat.category'),
        ),
        migrations.AlterField(
            model_name='room',
            name='created_by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_room', to=settings.AUTH_USER_MODEL),
        ),
    ]
