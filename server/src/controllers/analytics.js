import prisma from "../utils/prisma.js";

export const Analytics= async(req, res)=>{

    try {

        const totalcustomer = await prisma.customerData.count();
        const totalemployee = await prisma.user.count({
            where:{
                role: "EMPLOYEE"
            }
        });
        const totalreceptionist = await prisma.user.count({
            where: {
                role: "RECEPTIONIST"
            }
        });
        const leadstageraw = await prisma.customerData.groupBy({
            by: ["leadStage"],
            _count: {
                leadStage: true,
            },
        });

        const leadstage = leadstageraw.reduce((acc,curr)=>{
            acc[curr.leadStage] = curr._count.leadStage;
            return acc;
        },{})

        const priorityraw = await prisma.customerData.groupBy({
            by: ["priority"],
            _count: {
                priority: true,
            },
        })

        const priority = priorityraw.reduce((acc,curr)=>{
            acc[curr.priority] = curr._count.priority;
            return acc;
        },{})


        res.status(200).json({
            message: "Analytics fetched successfully",
            totalcustomer,
            totalemployee,
            totalreceptionist,
            leadstage,
            priority
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}