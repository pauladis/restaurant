from ..models import MenuItem, Order, OrderItem, Categories
from rest_framework.viewsets import ModelViewSet
from .serializers import MenuItemSerializer, OrderSerializer, OrderItemSerializer, CategoriesSerializer


class MenuItemViewSet(ModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer

    #GET
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    #TODO move this to a custom middleware
    def finalize_response(self, request, response, *args, **kwargs):
        response["Access-Control-Allow-Origin"] = "*"
        return super().finalize_response(request, response, *args, **kwargs)


class OrderViewSet(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    #POST
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    
    def finalize_response(self, request, response, *args, **kwargs):
        response["Access-Control-Allow-Origin"] = "*"
        return super().finalize_response(request, response, *args, **kwargs)


class OrderItemViewSet(ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    # http_method_names = []

    #POST
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    
    def finalize_response(self, request, response, *args, **kwargs):
        response["Access-Control-Allow-Origin"] = "*"
        return super().finalize_response(request, response, *args, **kwargs)
    

class CategoriesViewSet(ModelViewSet):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer

    #GET
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    #POST
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    

    def finalize_response(self, request, response, *args, **kwargs):
        response["Access-Control-Allow-Origin"] = "*"
        return super().finalize_response(request, response, *args, **kwargs)