/**
 * initNewUser — call this on every new account creation (email, Google, GitHub, LinkedIn).
 * It zeroes out all progress, streaks, badges, and path data so a new user
 * always starts completely fresh.
 */
export function initNewUser() {
  const defaults = {
    // Dashboard metrics
    streak: 0,
    weeklyGoalHrs: 5,
    completedHrs: 0,
    xp: 0,
    totalPoints: 0,
    badges: [],
    certificates: 0,
    skillsUnlocked: 0,
    isNewUser: true,

    // Learning path progress (one key per path)
    'progress_ai_engineer':       0,
    'progress_data_scientist':    0,
    'progress_frontend':          0,
    'progress_backend':           0,
    'progress_fullstack':         0,
    'progress_devops':            0,
    'progress_product_designer':  0,

    // Active stage for each path (all start at stage 0 = first module)
    'stage_ai_engineer':       0,
    'stage_data_scientist':    0,
    'stage_frontend':          0,
    'stage_backend':           0,
    'stage_fullstack':         0,
    'stage_devops':            0,
    'stage_product_designer':  0,
  };

  Object.entries(defaults).forEach(([key, val]) => {
    localStorage.setItem(key, typeof val === 'object' ? JSON.stringify(val) : String(val));
  });
}
