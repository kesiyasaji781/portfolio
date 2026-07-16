from django.contrib import admin
from .models import Resume, Certification

@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ('title', 'uploaded_at', 'is_active')
    list_filter = ('is_active',)

@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ('title', 'issuer', 'credential_id', 'date')
    search_fields = ('title', 'issuer', 'credential_id')
