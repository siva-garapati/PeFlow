import React from 'react'
import '../styles/stats.css'
import { CalendarDays, ArrowDownUp, BanknoteArrowUp, IndianRupee, BanknoteArrowDown } from 'lucide-react'

const Stats = ({data}) => {
    return (
        <>
            <div className='transactions-period'>
                <div className='svg-icon'>
                    <CalendarDays />
                </div>
                <div className='text'>
                    <h3>Transaction Period</h3>
                    <p>{data.transactionPeriod}</p>
                </div>
            </div>

            <div className='stats-grid'>
                <div className='stat-card'>
                    <div className='stat-icon'>
                        <ArrowDownUp />
                    </div>
                    <div className='stat-text'>
                        <h4>Total Transactions</h4>
                        <p>{data.totalTransactions}</p>
                    </div>
                </div>
                <div className='stat-card'>
                    <div className='stat-icon'>
                        <BanknoteArrowUp />
                    </div>
                    <div className='stat-text'>
                        <h4>Total Amount Recieved</h4>
                        <p>{data.totalAmountRecieved.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
                    </div>
                </div>
                <div className='stat-card'>
                    <div className='stat-icon'>
                        <BanknoteArrowDown />
                    </div>
                    <div className='stat-text'>
                        <h4>Total Amount Spent</h4>
                        <p>{data.totalAmountSpent.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
                    </div>
                </div>
                <div className='stat-card'>

                    <div className='stat-icon'>
                        <IndianRupee />
                    </div>
                    <div className='stat-text'>
                        <h4>Net Amount</h4>
                        <p style={{ color: data.netAmount >= 0 ? 'rgba(0, 255, 26, 1)' : 'rgba(255, 73, 73, 1)' }}>
                            {`${data.netAmount > 0 ? '+' : ''}${data.netAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) }`}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Stats