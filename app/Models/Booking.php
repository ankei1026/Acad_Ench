<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Booking extends Model
{
    use HasFactory;

    protected $primaryKey = 'book_id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'book_id',
        'user_id',
        'tutor_id',
        'tutor_status',
        'decline_reason',
        'booking_status',
        'booking_date',
        'session_duration',
        'start_time',
        'end_time',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->book_id)) {
                $model->book_id = self::generateBookingId();
            }
        });
    }

    public static function generateBookingId(): string
    {
        do {
            $random = Str::upper(Str::random(5));
            $bookingId = 'BK_' . $random;
        } while (self::where('book_id', $bookingId)->exists());

        return $bookingId;
    }

    /* ================= RELATIONSHIPS ================= */

    public function learner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function tutor()
    {
        return $this->belongsTo(Tutor::class, 'tutor_id', 'tutor_id');
    }
}
