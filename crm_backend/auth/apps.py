# auth/apps.py
from django.apps import AppConfig

class AuthConfig(AppConfig):
    name = 'auth'

    def ready(self):
        import auth.signals  # 导入信号