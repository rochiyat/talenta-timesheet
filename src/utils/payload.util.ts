const payloadUtil = {
  dataFormated: (response: any) => {
    return response.map((dt: any) => {
      return {
        // Preserve the date and total duration from the original data
        date: dt.date,
        total_duration: dt.total_duration,
        // Transform the 'data' array for each day
        data: dt.data.map((d: any) => {
          return {
            // Extract and rename relevant fields from each entry
            id: d.id,
            task_id: d.task_id,
            task_title: d.task_title,
            start_time: d.start_time,
            end_time: d.end_time,
            duration: d.activity_duration, // Rename activity_duration to duration
            activity: d.activity,
          };
        }),
      };
    });
  },
};

export default payloadUtil;
