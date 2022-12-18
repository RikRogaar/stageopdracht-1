<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class todoItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'image',
        'is_completed',
        'description',
    ];
}
