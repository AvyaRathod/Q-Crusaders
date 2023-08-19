# -*- coding: utf-8 -*-
"""
Created on Fri Aug 18 19:49:56 2023

@author: prath
"""


import os
import shutil
import sqlite3
import sys
from datetime import datetime, timedelta

"""Query chrome-history
Params:
    query_title           : str. title to query. Set "'%.%'" for empty. ex. "'%queryword%'"
    query_url             : str. url to query. Set "'%.%'" for empty
    dt_to                 : datetime. to  ex. datetime(2022, 1, 1, 0, 0)
    dt_from               : datetime. from 
    tz                    : int. timezone (UTC=0)
    history_file_original : str. full/path/chromehistory/in_your_PC
    history_file_tmp      : str. filename of chromehistory snapshot
    
Set "'%%'" for empty condition of title or url
"""
query_title = "'%%'"
query_url = "'%twitter%'"

dt_to = datetime.now()
dt_from = datetime.now() - timedelta(days=7)
tz = 9

history_file_original = "C:\\Users\\prath\\AppData\\Local\\Google\\Chrome\\User Data"
history_file_tmp = "chrome-history-snapshot"


def dt2str(dt):
    return dt.strftime("%Y-%m-%d %H:%M:%S")


def date_from_webkit(webkit_timestamp, tz):
    """Convert webkit(utc) to local datetime"""
    epoch_start = datetime(1601, 1, 1)
    delta = timedelta(hours=tz, microseconds=int(webkit_timestamp))
    return epoch_start + delta


def date_to_webkit(dt, tz):
    """Convert local datetime to webkit(utc)"""
    epoch_start = datetime(1601, 1, 1)
    delta = dt - epoch_start - timedelta(hours=tz)
    delta_micro_sec = (delta.days * 60 * 60 * 24 + delta.seconds) * 1000 * 1000
    return delta_micro_sec


def time_range_set(dt_from, dt_to, tz):
    time_to = date_to_webkit(dt_to, tz)
    time_from = date_to_webkit(dt_from, tz)
    return time_from, time_to


def sql_query(time_from, time_to, title, url):

    # Copy history file if updated
    try:
        if os.stat(history_file_original).st_mtime - os.stat(history_file_tmp).st_mtime > 1:
            shutil.copy2(history_file_original, history_file_tmp)
    except FileNotFoundError:
        shutil.copy2(history_file_original, history_file_tmp)

    conn = sqlite3.connect(history_file_tmp)
    c = conn.cursor()
    sql_string = f"""SELECT * FROM urls
                     WHERE {time_from} < last_visit_time
                     AND last_visit_time < {time_to}
                     AND title like {title}
                     AND url like {url}
                     ORDER BY last_visit_time DESC;"""

    c.execute(sql_string)
    fetch_result = c.fetchall()
    return fetch_result


if __name__ == "__main__":

    print(f"Query chrome history")
    print(f"From: {dt2str(dt_from)}, To: {dt2str(dt_to)}")
    print(f"Title {query_title}")
    print(f"Url {query_url}")
    time_from, time_to = time_range_set(dt_from, dt_to, tz)
    fetch_result = sql_query(time_from, time_to, query_title, query_url)
    
    print(f"{len(fetch_result)} results...")

    for i in fetch_result:
        time = i[5]
        url = i[1]
        title = i[2]

        dt = date_from_webkit(time, tz)
        time_str = dt2str(dt)

        # Formatting
        max_len = 72
        if len(title) > max_len:
            title = title[:max_len] + "..."

        print(time_str, title, url)