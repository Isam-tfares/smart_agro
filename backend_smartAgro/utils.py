from datetime import datetime
def get_data_of_day_month_year(data, day, month, year,column="all"):
    filtered_data = []
    for entry in data:
        timestamp = datetime.strptime(entry['timestamp'], '%Y-%m-%d %H:%M:%S')
        if timestamp.day == day and timestamp.month == month and timestamp.year == year:
            if column=="all":
                filtered_data.append(entry)
            else:
                filtered_data.append({'timestamp':entry['timestamp'],column:entry[column]})
    return filtered_data


def get_data_of_month_year(data, month, year,column="all"):
    filtered_data = []
    for entry in data:
        timestamp = datetime.strptime(entry['timestamp'], '%Y-%m-%d %H:%M:%S')
        if timestamp.month == month and timestamp.year == year:
            if column=="all":
                filtered_data.append(entry)
            else:
                filtered_data.append({'timestamp':entry['timestamp'],column:entry[column]})
    return filtered_data



def get_data_of_current_hour(data,column="all"):
    current_time = datetime.now()
    current_hour = current_time.hour
    current_day = current_time.day
    current_month = current_time.month
    current_year = current_time.year
    
    filtered_data = []
    for entry in data:
        timestamp = datetime.strptime(entry['timestamp'], '%Y-%m-%d %H:%M:%S')
        if (timestamp.hour == current_hour and 
            timestamp.day == current_day and 
            timestamp.month == current_month and 
            timestamp.year == current_year):
            if column=="all":
                filtered_data.append(entry)
            else:
                filtered_data.append({'timestamp':entry['timestamp'],column:entry[column]})

    return filtered_data