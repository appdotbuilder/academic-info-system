<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Enrollment
 *
 * @property int $id
 * @property int $student_id
 * @property int $schedule_id
 * @property string $semester
 * @property \Illuminate\Support\Carbon $enrolled_at
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Student $student
 * @property-read \App\Models\Schedule $schedule
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Grade> $grades
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Enrollment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Enrollment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Enrollment query()
 * @method static \Illuminate\Database\Eloquent\Builder|Enrollment active()
 * @method static \Illuminate\Database\Eloquent\Builder|Enrollment whereEnrolledAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Enrollment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Enrollment whereScheduleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Enrollment whereSemester($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Enrollment whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Enrollment whereStudentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Enrollment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Enrollment whereUpdatedAt($value)
 * @method static \Database\Factories\EnrollmentFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Enrollment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'student_id',
        'schedule_id',
        'semester',
        'enrolled_at',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'student_id' => 'integer',
        'schedule_id' => 'integer',
        'enrolled_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the student that owns the enrollment.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    /**
     * Get the schedule that owns the enrollment.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function schedule(): BelongsTo
    {
        return $this->belongsTo(Schedule::class);
    }

    /**
     * Get the grades for the enrollment.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function grades(): HasMany
    {
        return $this->hasMany(Grade::class);
    }

    /**
     * Scope a query to only include active enrollments.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'enrolled');
    }
}