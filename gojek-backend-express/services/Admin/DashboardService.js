module.exports = function () {
  const DashboardRepository = require('../../repository/Admin/DashboardRepository')
  const Common = require('../../Utils/common')
  require('dotenv').config({ path: './../.env' })

  var dashboardRepository = new DashboardRepository();
  var common = new Common();

  this.admindashboardListViewService = async (callback) => {
    var response = {}
    var dashboard = []
    const users = 'Users'
    const providers = 'Provider'
    const booking = 'Booking'
    const ridevehicletype = 'RideVehicleType'
    var day = 'day'
    var month = 'month'
    var year = 'year'
    var week = 'week'
    var completed = 'completed'
    var cancelled = 'cancelled'
    var accepted  = 'accepted'
    var taxi = 'taxi';
    var delivery = 'delivery';
    var services = 'services';
    try {
      var userscount = await dashboardRepository.dashboardListView(users)
      var providerscount = await dashboardRepository.dashboardListView(providers)
      var bookingscount = await dashboardRepository.dashboardListView(booking)
      var ridevehicletypecount = await dashboardRepository.dashboardListView(ridevehicletype)
      var dayearning = await dashboardRepository.dashboardBookingEarningsView(day)
      var monthearning = await dashboardRepository.dashboardBookingEarningsView(month)
      var weekearning = await dashboardRepository.dashboardBookingEarningsView(week)
      var yearearning = await dashboardRepository.dashboardBookingEarningsView(year)
      var completedBooking = await dashboardRepository.dashboardBookingCountView(completed)
      var cancelledBooking = await dashboardRepository.dashboardBookingCountView(cancelled)
      var activeBooking = await dashboardRepository.dashboardBookingCountView(accepted)
      var taxiBookingCount = await dashboardRepository.bookingCountView(taxi)
      var deliveryBookingCount = await dashboardRepository.bookingCountView(delivery)
      var servicesBookingCount = await dashboardRepository.bookingCountView(services)

      
      dashboard.push({
        userscount: userscount.data['count'],
        providerscount: providerscount.data['count'],
        bookingscount: bookingscount.data['count'],
        ridevehicletypecount: ridevehicletypecount.data['count'],
        dayearning: dayearning.data['Total'],
        monthearning: monthearning.data['Total'],
        weekearning: weekearning.data['Total'],
        yearearning: yearearning.data['Total'],
        completedBookingCount: completedBooking.data['count'],
        cancelledBookingCount: cancelledBooking.data['count'],
        activeBookingCount: activeBooking.data['count'],
        taxiBookingCount: taxiBookingCount.data['count'],
        deliveryBookingCount: deliveryBookingCount.data['count'],
        servicesBookingCount: servicesBookingCount.data['count']
      })
      if (userscount.error === false && providerscount.error === false && bookingscount.error === false && ridevehicletypecount.error === false &&
            dayearning.error === false && monthearning.error === false && weekearning.error === false && yearearning.error === false && completedBooking.error === false && cancelledBooking.error === false && activeBooking.error === false
           && taxiBookingCount.error === false && deliveryBookingCount.error === false && servicesBookingCount.error === false) {
        response.error = false
        response.data = dashboard
        response.msg = 'VALID'
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
}
