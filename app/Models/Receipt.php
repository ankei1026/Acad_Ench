<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receipt extends Model
{
    use HasFactory;

    protected $fillable = [
        'book_id',
        'reference',
        'amount',
        'photo',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class, 'book_id', 'book_id');
    }
}
