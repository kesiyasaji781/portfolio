from rest_framework import generics, views, status
from rest_framework.response import Response
from .models import Resume, Certification
from .serializers import ResumeSerializer, CertificationSerializer

class CertificationListView(generics.ListCreateAPIView):
    queryset = Certification.objects.all().order_by('-id')
    serializer_class = CertificationSerializer

class ActiveResumeView(views.APIView):
    def get(self, request, *args, **kwargs):
        active_resume = Resume.objects.filter(is_active=True).first()
        if active_resume:
            serializer = ResumeSerializer(active_resume, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"detail": "No active resume found."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        file_obj = request.FILES.get('file')
        if not file_obj:
            return Response({"detail": "No file was uploaded."}, status=status.HTTP_400_BAD_REQUEST)
        
        title = request.data.get('title', 'Resume')
        # This will create a new Resume and automatically deactivate older ones via the save() method override.
        resume = Resume.objects.create(
            title=title,
            file=file_obj,
            is_active=True
        )
        serializer = ResumeSerializer(resume, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)
