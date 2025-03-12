<?php

namespace Database\Seeders;

use App\Infrastructure\Persistence\Eloquent\User\UserModel;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call([
            MainAdminSeeder::class,
            ProductSeeder::class,
        ]);
    }
}
