from django.urls import path
from .views import CertificationListView, ActiveResumeView

urlpatterns = [
    path('certifications/', CertificationListView.as_view(), name='certification-list'),
    path('resume/', ActiveResumeView.as_view(), name='active-resume'),
]
