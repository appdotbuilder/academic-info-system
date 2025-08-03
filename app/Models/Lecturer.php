<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * App\Models\Lecturer
 *
 * @property int $id
 * @property string $lecturer_id
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @property string|null $phone
 * @property string $department
 * @property string|null $title
 * @property string|null $specialization
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read string $full_name
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Schedule> $schedules
 * @property-read \App\Models\User|null $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Lecturer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Lecturer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Lecturer query()
 * @method static \Illuminate\Database\Eloquent\Builder|Lecturer active()
 * @method static \Illuminate\Database\Eloquent\Builder|Lecturer whereDepartment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lecturer whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lecturer whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lecturer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lecturer whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lecturer whereLecturerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lecturer wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lecturer whereSpecialization($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lecturer whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lecturer whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lecturer whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lecturer whereUpdatedAt($value)
 * @method static \Database\Factories\LecturerFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Lecturer extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'lecturer_id',
        'first_name',
        'last_name',
        'email',
        'phone',
        'department',
        'title',
        'specialization',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the lecturer's full name.
     *
     * @return string
     */
    public function getFullNameAttribute(): string
    {
        $name = $this->first_name . ' ' . $this->last_name;
        return $this->title ? $this->title . ' ' . $name : $name;
    }

    /**
     * Get the schedules for the lecturer.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function schedules(): HasMany
    {
        return $this->hasMany(Schedule::class);
    }

    /**
     * Get the user account for the lecturer.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }

    /**
     * Scope a query to only include active lecturers.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}