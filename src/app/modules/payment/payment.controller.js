const { getPaymentService, updatePaymentService, deletePaymentService, createPaymentService, getAllPaymentService, getSinglePaymentService, calculateMonthlyStatisticsService, calculateYearlyStatisticsService, calculateQuarterlyStatisticsService, getOwnerPaymentService, getTenantsPaymentService } = require("./payment.service")


module.exports.createPayment = async (req, res, next) => {
    try {
        const data = req.body
        const price = data.price;
        const amount = price * 100;
        const paymentIntent = await createPaymentService(amount);

        res.send({
            clientSecret: paymentIntent.client_secret,
        });

    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Payment not yet",
            error: error.message
        })
        console.log(error, 'error')
    }
}

module.exports.getTenantsPayment = async (req, res) => {
    try {
        const email = req?.query?.email;
        const result = await getTenantsPaymentService(email);


        res.status(200).json({
            status: "success",
            message: "get Payment successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get Payment",
            error: error.message
        })
    }
}


module.exports.getOwnerPayment = async (req, res) => {
    try {
        const email = req?.query?.email;
        const result = await getOwnerPaymentService(email);


        // Calculate monthly statistics
        const monthlyStats = await calculateMonthlyStatisticsService(email);


        // Calculate yearly statistics
        const yearlyStats = await calculateYearlyStatisticsService(email);


        // Calculate yearly statistics
        const quarterlyStats = await calculateQuarterlyStatisticsService(email);


        res.status(200).json({
            status: "success",
            message: "get Payment successfully",
            data: {
                data: result,
                monthlyStatistics: monthlyStats,
                yearlyStatistics: yearlyStats,
                quarterStatistics: quarterlyStats
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get Payment",
            error: error.message
        });
    }
}


module.exports.getAllPayment = async (req, res) => {
    try {
        const result = await getAllPaymentService();
        res.status(200).json({
            status: "success",
            message: "get payment successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get Payment",
            error: error.message
        })
    }
}

module.exports.getSinglePayment = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await getSinglePaymentService(id);
        res.status(200).json({
            status: "success",
            message: "get payment successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get Payment",
            error: error.message
        })
    }
}


module.exports.updatePayment = async (req, res) => {
    try {
        const payments = req.body
        const updatedPayments = await updatePaymentService(payments);

        res.status(200).json({
            status: "success",
            message: "Update successfully",
            data: updatedPayments
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't Update",
            error: error.message
        })
    }
}


exports.deletePayment = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id);
        const result = await deletePaymentService(id)


        if (!result.deletedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Could't delete"
            })
        }
        res.status(200).json({
            status: "Success",
            message: "Delete Successfull",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Couldn't Delete",
            error: error.message
        })
        console.log(error, 'error')
    }
}



