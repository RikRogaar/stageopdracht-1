<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('todo_items')->insert([
            'title' => 'Finish assignment',
            'description' => 'Finish the assignment for the Laravel course',
            'is_completed' => false,
        ]);

        DB::table('todo_items')->insert([
            'title' => 'Finish bInsta',
            'description' => 'Finish the bInsta project',
            'is_completed' => false,
            'image' => 'https://img.icons8.com/ios-glyphs/512/compact-camera.png',
        ]);

        DB::table('todo_items')->insert([
            'title' => 'Copy and paste code',
            'description' => 'uhmmm...',
            'is_completed' => true,
        ]);

    }
}
