var total_quota;
var total_completed;
var total_completed_percent;


var quota_data = [];

var interview_data;
var today_flight_list;
var this_month_flight_list;
var daily_plan_data;
var removed_ids_data;

var currentMonth;
var currentDate;
var nextDate;
var download_time_an;

var total_quota;
var total_completed;
var total_completed_percent;

var total_quota_completed;
var report_version = 1;
/************************************/
// function initCurrentTimeVars() {
//   var d = new Date();
      
//   var month = '' + (d.getMonth() + 1); //month start from 0;
  
//   var day = '' + d.getDate();
//   var year = d.getFullYear();

//   if (month.length < 2) 
//       month = '0' + month;
//   if (day.length < 2) 
//       day = '0' + day;

//   currentMonth =[month,year].join('-')
//   currentDate = [day, month,year].join('-');
  
//   //next day
//   var tomorrow = new Date();
//   tomorrow.setDate(tomorrow.getDate()+1);
//   var tomorrowMonth = '' + (tomorrow.getMonth() + 1); //month start from 0;
//   var tomorrowDay = '' + tomorrow.getDate();
//   var tomorrowYear = tomorrow.getFullYear();

//   if (tomorrowMonth.length < 2) 
//   tomorrowMonth = '0' + tomorrowMonth;
//   if (tomorrowDay.length < 2) 
//   tomorrowDay = '0' + tomorrowDay;
//   nextDate  = [tomorrowDay, tomorrowMonth, tomorrowYear].join('-');

//   //return [day, month,year].join('-');
//   if (document.getElementById('year_month') && document.getElementById('year_month').value.length > 0)
//   {
//     if (document.getElementById('year_month').value != "current-month")
//     {
//       currentMonth = document.getElementById('year_month').value;
//     }
//   }
//   console.log("currentMonth: ", currentMonth);
//   switch(currentMonth) {
//     case "01-2023":
//     case "02-2023":
//     case "03-2023":                  
//     case "04-2023":
//     case "05-2023":
//     case "06-2023":
//     case "07-2023":
//       report_version = 1;
//       total_quota = 750;
//       total_quota = 250;
//       break;
//     case "08-2023":
//     case "09-2023":      
//     case "10-2023":          
//     case "11-2023":          
//     case "12-2023":      
//       report_version = 2;        
//       total_quota = 1125;
//       total_quota = 375;
//       break;

//     case "11-2024":          
//         report_version = 2;        
//         total_quota = 1500;
//         total_quota = 500;
//       break;      
//     case "12-2024":      
//     case "01-2025":      
//     case "02-2025":      
//     case "03-2025":                  
//     case "04-2025":    
//     report_version = 2;        
//     total_quota = 1125;
//     total_quota = 375;
//     break;  
    
//     case "05-2025":                  
//     case "06-2025":                  
//     case "07-2025":                  
//     case "08-2025":                                      
//     case "09-2025":                                      
//     case "10-2025":                                      
//     case "11-2025":                                      
//     case "12-2025":                                                      
//       report_version = 2;        
//       total_quota = 1100;
//       total_quota = 450;
//       break;      
    
//     default:
//       report_version = 2;        
//       total_quota = 1125;
//       total_quota = 375;
//       break;
//   }
// }

// function isCurrentMonth(interviewEndDate)
// {
// // Input: "2023-04-03 10:06:22 GMT"
//   var interviewDateParsed = interviewEndDate.split("-")

//   var interviewYear = (interviewDateParsed[0]);
//   var interviewMonth =(interviewDateParsed[1]);
  
//   var result = false;

//   if ( currentMonth ==[interviewMonth,interviewYear].join('-'))
//   {
//     result = true;
//   }

//    return result;
// }


function CalculateArrival() {
  var interview_data_temp  = JSON.parse(interview_statistics);

  download_time_an = interview_data_temp[0].download_time;

  initCurrentTimeVars();
  quota_data = [];

  total_completed = 0;
  for (i = 0; i < interview_data_temp.length; i++) {
    var interview = interview_data_temp[i];
    //only get complete interview & not test
    // if ( // (interview.InterviewState == "Complete") && 
    //   (isCurrentMonth(interview.InterviewDate))
    //   )
    {
      quota_data.push(interview);

      total_completed = total_completed + interview["Number of interviews"];
    }
  }
  total_completed_percent = (100*(total_completed/total_quota)).toFixed(0);   
}

function PreparaArrivalData() {
  var location_percent_data  = JSON.parse(location_percent);
  var location_count_data  = JSON.parse(location_count );

  initCurrentTimeVars();

  quota_data = [
    { "Location": "T1-A/E03", "Exit": "0%", "Belt" : "0%", "Landside" :"0%", "Total" : 0},
    { "Location": "T1-A/E04", "Exit": "0%", "Belt" : "0%", "Landside" :"0%", "Total" : 0},
    { "Location": "T1-B (T1-Pier)", "Exit": "0%", "Belt" : "0%", "Landside" :"0%", "Total" : 0},
    { "Location": "T1-C", "Exit": "0%", "Belt" : "0%", "Landside" :"0%", "Total" : 0},
    { "Location": "T1-D", "Exit": "0%", "Belt" : "0%", "Landside" :"0%", "Total" : 0},
    { "Location": "T1-E", "Exit": "0%", "Belt" : "0%", "Landside" :"0%", "Total" : 0},
    { "Location": "T2", "Exit": "0%", "Belt" : "0%", "Landside" :"0%", "Total" : 0},  
    { "Location": "Total", "Exit": "0%", "Belt" : "0%", "Landside" :"0%", "Total" : 0}       
];

  for (i = 0; i < location_percent_data.length; i++) {
    var result = location_percent_data[i];
    var result_str = result.Percentage.toString() + "%";

    if (result.Month + "-" + result.Year == currentMonth)
    {
      for (j = 0; j < quota_data.length; j++) {
        var item = quota_data[j];
        if (result.Location == "T1-B")
        {
          result.Location = "T1-B (T1-Pier)";
        }

        if (item.Location == result.Location)
        {
          if (result.Exit_belt == "Exit") 
          {
            item.Exit = result_str;
          }
          if (result.Exit_belt == "Baggage belts") 
          {
            item.Belt =  result_str;
          }        
          if (result.Exit_belt == "Landside") 
          {
            item.Landside =  result_str;
          }        
        }
      }
    }
  }

  var total_of_total = 0;
  for (i = 0; i < location_count_data.length; i++) {
    var result = location_count_data[i];
    if (result.Month + "-" + result.Year == currentMonth)
    {
      for (j = 0; j < quota_data.length; j++) {
        var item = quota_data[j];
        if (result.Location == "T1-B")
        {
          result.Location = "T1-B (T1-Pier)";
        }

        if (item.Location == result.Location)
        {
          item.Total = item.Total  + result.completed_interviews
        }
        
        if (item.Location == "Total")
        {
          item.Total = item.Total  + result.completed_interviews
        }
      }
    }
  }
}
