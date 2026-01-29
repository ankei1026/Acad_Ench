<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Tutor;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Admin User
        $admin = User::create([
            'name' => 'System Administrator',
            'email' => 'admin@acadench.com',
            'role' => 'admin',
            'password' => Hash::make('12341234'),
            'email_verified_at' => now(),
        ]);

        // Create Tutor Users
        $tutor1 = User::create([
            'name' => 'Ralf Louie Ranario',
            'email' => 'Ralf@acadench.com',
            'role' => 'tutor',
            'password' => Hash::make('12341234'),
            'email_verified_at' => now(),
        ]);

        $tutor2 = User::create([
            'name' => 'Jiro Lugagay',
            'email' => 'sarah.tutor@acadench.com',
            'role' => 'tutor',
            'password' => Hash::make('12341234'),
            'email_verified_at' => now(),
        ]);

        // Create Tutor Profiles for each tutor user
        Tutor::create([
            'user_id' => $tutor1->id,
            'subject' => 'Mathematics',
            'specializations' => 'Algebra, Calculus, Geometry',
            'rate_per_hour' => 250.00,
            'photo' => '',
            'bio' => '',
            'status' => 'active',
            'mop' => '',
            'number' => '',
        ]);

        Tutor::create([
            'user_id' => $tutor2->id,
            'subject' => 'Science',
            'specializations' => 'Physics, Chemistry, Biology',
            'rate_per_hour' => 150.00,
            'photo' => '',
            'bio' => '',
            'status' => 'active',
            'mop' => '',
            'number' => '',
        ]);


        // Create Learner Users
        $learner1 = User::create([
            'name' => 'Jenn Ludo',
            'email' => 'jenn@acadench.com',
            'role' => 'learner',
            'password' => Hash::make('12341234'),
            'email_verified_at' => now(),
        ]);

        $learner2 = User::create([
            'name' => 'PrienceArhnamael Suan Polvorosa',
            'email' => 'polvorosa@acadench.com',
            'role' => 'learner',
            'password' => Hash::make('12341234'),
            'email_verified_at' => now(),
        ]);

        $learner3 = User::create([
            'name' => 'Precious Lea',
            'email' => 'precious@acadench.com',
            'role' => 'learner',
            'password' => Hash::make('12341234'),
            'email_verified_at' => now(),
        ]);

        // Console output
        $this->command->info('Database seeded successfully!');
        $this->command->info('Admin: admin@acadench.com / 12341234');
        $this->command->info('Tutor: john.tutor@acadench.com / 12341234');
        $this->command->info('Learner: alex.learner@acadench.com / 12341234');
    }
}
