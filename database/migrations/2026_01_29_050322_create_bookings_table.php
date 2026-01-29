<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->string('book_id', 8)->primary();

            // Learner (user who books)
            $table->foreignId('user_id')
                  ->constrained()
                  ->cascadeOnDelete();

            // Tutor being booked
            $table->string('tutor_id');
            $table->foreign('tutor_id')
                  ->references('tutor_id')
                  ->on('tutors')
                  ->cascadeOnDelete();

            $table->string('amount')->nullable();

            $table->enum('tutor_status', ['pending', 'accept', 'decline', 'success', 'failed'])
                  ->default('pending');

            $table->longText('decline_reason')->nullable();

            $table->enum('booking_status', ['pending', 'paid', 'canceled'])
                  ->default('pending');

            $table->date('booking_date')->nullable();
            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();
            $table->string('session_duration')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
