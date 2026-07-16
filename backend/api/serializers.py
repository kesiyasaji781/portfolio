from rest_framework import serializers
from .models import Resume, Certification

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ['id', 'title', 'file', 'uploaded_at', 'is_active']

class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = ['id', 'title', 'issuer', 'credential_id', 'date', 'verify_link', 'file', 'color']
