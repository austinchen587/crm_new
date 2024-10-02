# Generated by Django 3.2.25 on 2024-10-01 15:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='姓名')),
                ('phone', models.CharField(max_length=20, verbose_name='电话')),
                ('education', models.CharField(choices=[('below_college', '大专以下'), ('college', '大专'), ('bachelor', '本科'), ('master_above', '研究生及以上'), ('unknow', '未知')], default='college', max_length=20, verbose_name='学历')),
                ('major_category', models.CharField(choices=[('it', 'IT'), ('non_it', '非IT'), ('unknow', '未知')], default='it', max_length=10, verbose_name='专业类别')),
                ('status', models.CharField(choices=[('employed', '在职'), ('unemployed', '待业'), ('unknow', '未知')], default='unemployed', max_length=15, verbose_name='状态')),
                ('address', models.CharField(max_length=255, verbose_name='地址')),
                ('is_closed', models.BooleanField(default=False, verbose_name='是否成交')),
                ('attended_first_live', models.BooleanField(default=False, verbose_name='参加第一天直播')),
                ('attended_second_live', models.BooleanField(default=False, verbose_name='参加第二天直播')),
                ('first_day_watch_duration', models.IntegerField(default=0, verbose_name='第一天观看时长')),
                ('second_day_watch_duration', models.IntegerField(default=0, verbose_name='第二天观看时长')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='修改时间')),
            ],
            options={
                'verbose_name': '客户',
                'verbose_name_plural': '客户列表',
            },
        ),
    ]
