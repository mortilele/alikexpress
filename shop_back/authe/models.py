from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from api.models import UserPersonalCart


class ProfileManager(models.Manager):

    def create_profile(self, user):
        profile = self.model(user=user)
        profile.full_name = user.first_name + ' ' + user.lastname
        profile.save(using=self._db)
        return profile


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    phone_number = models.CharField(blank=True, null=True, max_length=20)
    full_name = models.CharField(blank=True, null=True, max_length=500)

    objects = ProfileManager()


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create_profile(user=instance)
        Token.objects.create(user=instance)
        UserPersonalCart.objects.create(owner=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
