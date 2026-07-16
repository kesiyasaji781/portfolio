from django.db import models

class Resume(models.Model):
    title = models.CharField(max_length=100, default="Resume")
    file = models.FileField(upload_to='resumes/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True, help_text="Only one resume can be active at a time.")

    def save(self, *args, **kwargs):
        if self.is_active:
            # Set all other resumes to inactive
            Resume.objects.filter(is_active=True).exclude(pk=self.pk).update(is_active=False)
        super(Resume, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} ({self.uploaded_at.strftime('%Y-%m-%d %H:%M')})"


class Certification(models.Model):
    title = models.CharField(max_length=255)
    issuer = models.CharField(max_length=255)
    credential_id = models.CharField(max_length=100, blank=True)
    date = models.CharField(max_length=100, help_text="e.g. Issued 2024")
    verify_link = models.URLField(max_length=500, blank=True)
    file = models.FileField(upload_to='certifications/', blank=True, null=True, help_text="Upload certificate PDF/image if available")
    color = models.CharField(
        max_length=255, 
        blank=True, 
        help_text="Tailwind background gradient classes, e.g. 'from-amber-500/10 to-orange-500/10 hover:border-amber-500/30'"
    )

    def __str__(self):
        return f"{self.title} - {self.issuer}"
