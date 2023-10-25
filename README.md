# Ширина контейнера
@include container($container-width);
@include container(100%); 

# Работа с флексом
@include flex-box('c', 'z');

#Медиа запросы
@include break(sm) {content}

@include width-media((xxl: 6, xx: 3, xl: 2, lg: 3, md: 6, sm: 12, sx: 12));


#Автоматическое создание модулей
npm run generate <название модуля>
