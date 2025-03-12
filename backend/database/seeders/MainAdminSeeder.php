<?php

namespace Database\Seeders;

use App\Infrastructure\Persistence\Eloquent\User\UserModel;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class MainAdminSeeder extends Seeder
{
    public function run(): void
    {
        if (!UserModel::where('username', 'mainadmin')->exists()) {
            UserModel::create([
                'username' => 'mainadmin',
                'password' => Hash::make('admin123'),
                'isAdmin' => true,
                'api_token' => Str::random(80),
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}
