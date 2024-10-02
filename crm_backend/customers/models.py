
from django.db import models
from django.contrib.auth.models import AbstractUser  # 从Django中导入AbstractUser类，用于扩展用户模型
from django.utils import timezone
from sales.models import SalesUser


# 定义学历选项
EDUCATION_CHOICES = [
    ('below_college', '大专以下'),
    ('college', '大专'),
    ('bachelor', '本科'),
    ('master_above', '研究生及以上'),
    ('unknow','未知'),
]

# 定义专业选项
MAJOR_CHOICES = [
    ('it', 'IT'),
    ('non_it', '非IT'),
    ('unknow','未知'),
]

# 定义状态选项
STATUS_CHOICES = [
    ('employed', '在职'),
    ('unemployed', '待业'),
    ('unknow','未知'),
]

# 定义微信、群组、邀约选项
YES_NO_CHOICES = [
    ('yes', '是'),
    ('no', '否'),
]

# 客户模型类，定义了客户数据的字段
class Customer(models.Model):
    name = models.CharField(max_length=100, verbose_name='姓名')
    phone = models.CharField(max_length=20, verbose_name='电话')
    education = models.CharField(max_length=20, choices=EDUCATION_CHOICES, default='college', verbose_name='学历')
    major_category = models.CharField(max_length=10, choices=MAJOR_CHOICES, default='it', verbose_name='专业类别')
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='unemployed', verbose_name='状态')
    address = models.CharField(max_length=255, verbose_name='就业意向城市')
    city = models.CharField(max_length=255, default='Default City', verbose_name='当前所在城市')
    
    # 新增字段
    is_closed = models.BooleanField(default=False, verbose_name='是否成交')  # 是否成交字段
    is_invited = models.BooleanField(default=False, verbose_name='是否邀约')  # 是否邀约字段
    is_joined = models.BooleanField(default=False, verbose_name='是否入群')  # 是否入群字段

    attended_first_live = models.BooleanField(default=False, verbose_name='参加第一天直播')  # 参加第一天直播字段
    attended_second_live = models.BooleanField(default=False, verbose_name='参加第二天直播')  # 参加第二天直播字段
    first_day_watch_duration = models.IntegerField(default=0, verbose_name='第一天观看时长')  # 第一日观看时长，单位：分钟
    second_day_watch_duration = models.IntegerField(default=0, verbose_name='第二天观看时长')  # 第二日观看时长，单位：分钟

    # 外键：哪个用户创建的客户
    created_by = models.ForeignKey(SalesUser, on_delete=models.CASCADE, null=True, related_name='customers_created', verbose_name='创建人')
    updated_by = models.ForeignKey(SalesUser, on_delete=models.SET_NULL, null=True, related_name='customers_updated', verbose_name='最后修改人')

    created_at = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='修改时间')
    description = models.TextField(null=True, blank=True, verbose_name='客户描述')  # 客户情况描述字段

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = '客户'
        verbose_name_plural = '客户列表'