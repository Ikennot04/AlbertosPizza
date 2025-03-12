<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;  // Import Str class for generating random strings
use Illuminate\Support\Facades\File;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create images directory if it doesn't exist
        if (!File::exists(public_path('images'))) {
            File::makeDirectory(public_path('images'), 0755, true);
        }

        $products = [
            [
                'product_image' => 'brownspanishlattee.jpg',
                'product_name' => 'Brown Spanish Latte',
                'product_price' => 39.00,
                'product_stock' => 1000,
                'description' => 'A delicious brown spanish latte.',
                'userID' => 1,
            ],
            [
                'product_image' => 'oreocoffee.jpg',
                'product_name' => 'Oreo Coffee',
                'product_price' => 39.00,
                'product_stock' => 1000,
                'description' => 'Oreo flavored coffee.',
                'userID' => 1,
            ],
            [
                'product_image' => 'blackforest.jpg',
                'product_name' => 'Black Forest',
                'product_price' => 39.00,
                'product_stock' => 1000,
                'description' => 'A chocolatey Black Forest dessert.',
                'userID' => 1,
            ],
            [
                'product_image' => 'dondarko.jpg',
                'product_name' => 'Don Darko',
                'product_price' => 39.00,
                'product_stock' => 1000,
                'description' => 'A dark, rich coffee experience.',
                'userID' => 1,
            ],
            [
                'product_image' => 'donyaberry.jpg',
                'product_name' => 'Donya Berry',
                'product_price' => 39.00,
                'product_stock' => 1000,
                'description' => 'A berry-infused coffee blend.',
                'userID' => 1,
            ],
            [
                'product_image' => 'icedcaramel.jpg',
                'product_name' => 'Iced Caramel',
                'product_price' => 39.00,
                'product_stock' => 1000,
                'description' => 'Refreshing iced caramel drink.',
                'userID' => 1,
            ],
            [
                'product_image' => 'macha.jpg',
                'product_name' => 'Macha Berry',
                'product_price' => 39.00,
                'product_stock' => 1000,
                'description' => 'Matcha and berry combined in one drink.',
                'userID' => 1,
            ],
            [
                'product_image' => 'macha.jpg',
                'product_name' => 'Macha',
                'product_price' => 39.00,
                'product_stock' => 1000,
                'description' => 'Refreshing matcha green tea.',
                'userID' => 1,
            ],
        ];

        // Copy images and prepare product data
        foreach ($products as &$product) {
            $sourceImage = database_path('seeders/images/' . $product['product_image']);

            if (File::exists($sourceImage)) {
                // Copy image to public directory
                File::copy($sourceImage, public_path('images/' . $product['product_image']));
            } else {
                // Use default image if source doesn't exist
                $product['product_image'] = 'default.jpg';
            }

            $product['product_id'] = strtoupper(Str::random(15));
            $product['created_at'] = now();
            $product['updated_at'] = now();
            $product['userID'] = 1; // Setting default userID for all products
        }

        // Insert the product data into the database
        DB::table('product')->insert($products);
    }
}
