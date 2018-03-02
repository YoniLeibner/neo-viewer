"""neural_activity_app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from app.views import browse, segment
from neural_activity_app.views import home, config

# from rest_framework import routers

# router = routers.DefaultRouter()
# router.register(r'users', UserViewSet)

urlpatterns = [
    url('', include('social.apps.django_app.urls', namespace='social')),
    url('', include('hbp_app_python_auth.urls', namespace='hbp-social')),
    url(r'^config.json$', config, name='config'),
    url(r'^', home, name='home'),
   
    # url(r'^', include(router.urls)),
    # url(r'^admin/', admin.site.urls),
    # url(r'^browse/', browse, name='browse'),
    # url(r'^segment/', segment, name='segment'),
    # url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
   
    # url(r'^edit/$',edit, name='edit'),
]