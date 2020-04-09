import random
import string


def get_random_name(length=25):
    y = ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(length))
    return y


def image_path(instance, filename):
    category = instance.product.category.name
    product = instance.product.name
    y = get_random_name()
    name, extension = filename.split('.')
    return 'categories/{}/{}/{}.{}'.format(category, product, y, extension)