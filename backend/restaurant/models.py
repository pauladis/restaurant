from django.db import models

class Categories(models.Model):
    name = models.CharField(max_length=255)
    image_id = models.ImageField(upload_to="categories", null=True, blank=True)

    def __str__(self):
        return self.name
    
    
class MenuItem(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, default=None)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    picture = models.ImageField(upload_to="items", null=True, blank=True)
    categorie_id = models.ForeignKey(Categories, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Order(models.Model):
    total = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    payment = models.JSONField()

    def __str__(self):
        return f"Order #{self.id}"
    

class OrderItem(models.Model):
    item_id = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    order_id = models.ForeignKey(Order, on_delete=models.DO_NOTHING, null=True, blank=True)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"Order ID: {self.order_id}, Items:{self.item_id} quantity = {self.quantity}"