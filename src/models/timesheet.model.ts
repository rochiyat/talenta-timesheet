export interface Timesheet {
  date: string;
  total_duration: number;
  data: Data[];
}

export interface Data {
  id: number;
  task_id: number;
  assignee_id: number;
  company_id: number;
  activity: string;
  status: number;
  start_time: string;
  end_time: string;
  starttime_type: number;
  activity_duration: string;
  full_duration: string;
  applies_date: string;
  task_title: string;
  project_name: string;
  project_color: string;
  status_approval: number;
  reason: string;
  approval_by: null;
  created_date: string;
  updated_date: string;
  attendance_snapshot: {
    on_start: null;
    on_end: null;
  };
}
