from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    LoginView,
    PasswordTokenCheckAPI,
    RegisterUser,
    RequestPasswordResetEmail,
    SetNewPasswordAPIView,
    UserList,
    RequestVerifyEmail,
    VerifyEmail,
    EditProfile, 
    UpdateUserPassword,
    test
)





urlpatterns = [
    path('register/', RegisterUser.as_view(), name='register-user'),
    path('login/', LoginView.as_view(), name='login-url'),
    path('refresh-token/', TokenRefreshView.as_view(), name='refresh-token'),
    path('users-list/', UserList.as_view(), name='users-list'),
    path('request-reset-email/', RequestPasswordResetEmail.as_view(),
         name="request-reset-email"),
    path('password-reset/<uidb64>/<token>/',
         PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete/', SetNewPasswordAPIView.as_view(),
         name='password-reset-complete'),
    path('request-verify-email/', RequestVerifyEmail.as_view(), name="request-verify-email"),
    path('verify-email/', VerifyEmail.as_view(), name="verify-email"),
    path('edit-profile/', EditProfile.as_view()),
    path('update-password/', UpdateUserPassword.as_view()),
    path("test/", test, name="test"),

]