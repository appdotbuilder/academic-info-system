<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Grade
 *
 * @property int $id
 * @property int $enrollment_id
 * @property string $grade_type
 * @property float|null $points_earned
 * @property float $points_possible
 * @property string|null $letter_grade
 * @property float|null $grade_percentage
 * @property string|null $comments
 * @property \Illuminate\Support\Carbon|null $graded_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Enrollment $enrollment
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Grade newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Grade newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Grade query()
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereComments($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereEnrollmentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereGradePercentage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereGradeType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereGradedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereLetterGrade($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade wherePointsEarned($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade wherePointsPossible($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereUpdatedAt($value)
 * @method static \Database\Factories\GradeFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Grade extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'enrollment_id',
        'grade_type',
        'points_earned',
        'points_possible',
        'letter_grade',
        'grade_percentage',
        'comments',
        'graded_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'enrollment_id' => 'integer',
        'points_earned' => 'decimal:2',
        'points_possible' => 'decimal:2',
        'grade_percentage' => 'decimal:2',
        'graded_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the enrollment that owns the grade.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function enrollment(): BelongsTo
    {
        return $this->belongsTo(Enrollment::class);
    }
}