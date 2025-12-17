import React from 'react';
import './AllocationTable.css';

const AllocationTable = ({ data }) => {
  const departments = ['electrical', 'mechanical', 'civil', 'instrumentation', 'safety'];
  
  return (
    <div className="allocation-table">
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Project</th>
              {departments.map((dept) => (
                <th key={dept}>{dept.charAt(0).toUpperCase() + dept.slice(1)}</th>
              ))}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              const total = departments.reduce((sum, dept) => sum + (row[dept] || 0), 0);
              
              return (
                <tr key={index}>
                  <td>
                    <div className="project-cell">
                      <div className="project-color"></div>
                      <span>{row.project}</span>
                    </div>
                  </td>
                  {departments.map((dept) => (
                    <td key={dept}>
                      <div className="allocation-cell">
                        <div 
                          className="allocation-bar"
                          style={{ width: `${((row[dept] || 0) / 5) * 100}%` }}
                        ></div>
                        <span className="allocation-value">{row[dept] || 0}</span>
                      </div>
                    </td>
                  ))}
                  <td>
                    <div className="total-cell">
                      <span className="total-value">{total}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              {departments.map((dept) => {
                const deptTotal = data.reduce((sum, row) => sum + (row[dept] || 0), 0);
                return (
                  <td key={dept}>
                    <div className="footer-cell">
                      <span className="footer-value">{deptTotal}</span>
                    </div>
                  </td>
                );
              })}
              <td>
                <div className="footer-cell total">
                  <span className="footer-value">
                    {data.reduce((sum, row) => {
                      return sum + departments.reduce((rowSum, dept) => rowSum + (row[dept] || 0), 0);
                    }, 0)}
                  </span>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default AllocationTable;