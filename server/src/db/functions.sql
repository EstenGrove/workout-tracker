CREATE OR REPLACE FUNCTION get_pill_summary_by_date2(
    userID UUID,
    scheduleID INT, 
    targetDate DATE DEFAULT NOW()::DATE
)
RETURNS TABLE (
    schedule_id INT, 
    total_pills NUMERIC(10, 2), 
    total_pills_taken NUMERIC(10, 2), 
    total_pills_taken_today NUMERIC(10, 2), 
    total_pills_remaining NUMERIC(10, 2), 
    days_left INT
) 
LANGUAGE plpgsql
AS $$

DECLARE
    today DATE := NOW()::DATE;
    -- Today's range
    todayStart TIMESTAMPTZ := (today || ' 00:00:00')::TIMESTAMPTZ;
    todayEnd TIMESTAMPTZ := (today || ' 23:59:00')::TIMESTAMPTZ;


    dayStart TIMESTAMPTZ := (targetDate || ' 00:00:00')::TIMESTAMPTZ;
    dayEnd TIMESTAMPTZ := (targetDate || ' 23:59:59')::TIMESTAMPTZ;
    -- Totals
    totalPills NUMERIC(10, 2);
    totalPillsTaken NUMERIC(10, 2);
    totalPillsTakenToday NUMERIC(10, 2);

BEGIN
    -- Get schedule's dtart date as beginning of range
    SELECT 
        CAST(m.start_date AS TIMESTAMPTZ)
    INTO dayStart
    FROM medication_schedules m
    WHERE 
        m.is_active = true
        AND
        m.schedule_id = scheduleID;

    -- Total pills taken from start of schedule to date
    SELECT 
        CAST(SUM(ml.dose) AS NUMERIC(10, 2)) 
    INTO totalPillsTaken
    FROM medication_log ml
    WHERE 
        ml.schedule_id = scheduleID
        AND
        ml.logged_at BETWEEN dayStart AND dayEnd;

    -- Total pills taken TODAY
    SELECT 
        CAST(SUM(ml.dose) AS NUMERIC(10, 2))
    INTO totalPillsTakenToday
    FROM medication_log ml
    WHERE 
        ml.schedule_id = scheduleID
        AND 
        ml.logged_at BETWEEN todayStart AND todayEnd;
    
    RETURN QUERY
    SELECT
        ms.schedule_id,
        CAST(ms.quantity AS NUMERIC(10, 2)) as total_pills,
        totalPillsTaken as total_pills_taken,
        totalPillsTakenToday as total_pills_taken_today,
        CAST(ms.quantity - totalPillsTaken AS NUMERIC(10, 2)) as total_pills_remaining,
        CAST(GREATEST(CEIL(ms.end_date - targetDate), 0) AS INT) as days_left
    FROM medication_schedules ms
    WHERE 
        ms.schedule_id = scheduleID;


END;
$$;