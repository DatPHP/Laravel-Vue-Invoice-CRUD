# Laravel-Vue-Invoice-CRUD
Setup Environment
#Backend 
    Step 1: Composer i<br>
    Step 2: Update information in .env <br>
          DB_CONNECTION=mysql<br>
          DB_HOST=127.0.0.1<br>
          DB_PORT=3306<br>
          DB_DATABASE=your_db #your_db is name of database that you want to<br>
          DB_USERNAME=root <br>
          DB_PASSWORD=<br>

          ************* config send mail (GMail)*********************
          go to link https://myaccount.google.com/apppasswords in order to set password for your app 
          after pass app you get to this : 
            MAIL_MAILER=smtp
            MAIL_HOST=smtp.gmail.com
            MAIL_PORT=587
            MAIL_USERNAME="abc@gmail.com" // your email 
            MAIL_PASSWORD="xekv jegs micv mini" // Pass you get from set app 
            MAIL_ENCRYPTION=tls<br>
            MAIL_FROM_ADDRESS= "your_email"
            MAIL_FROM_NAME="${APP_NAME}"

            Find in code : 
            Mail::to('nguyenvandat170296@gmail.com') -> change your_email "
                      
    Step 3: run command line: php artisan migrate 
    Step 4: php artisan key:generate
    Step 5: Run command line:  php artisan serve 
    Step 6: Remove folder : public/storage and run command line: php artisan storage:link 
    


