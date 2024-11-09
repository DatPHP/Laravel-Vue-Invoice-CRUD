# Laravel-Vue-Invoice-CRUD
Setup Environment
#Backend 
Step 1: Composer i
Step 2: Update information in .env 
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_db #your_db is name of database that you want to
DB_USERNAME=root 
DB_PASSWORD=
Step 3: run command line: php artisan migrate 
Step 4: php artisan key:generate
Step 5: Run command line:  php artisan serve 
Step 6: Remove folder : public/storage and run command line: php artisan storage:link 


