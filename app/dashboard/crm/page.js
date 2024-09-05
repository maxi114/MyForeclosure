import React from 'react'

const page = () => {
  return (
    //*-------------Delete the below code and add your own code for the crm page for the dashboard------------*
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">CRM</h1>
          </div>
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                This is the main dashboard page
              </h3>
              <p className="text-sm text-muted-foreground">
                This page will be found inside app/dashboard/crm/page.js
              </p>
            </div>
          </div>
        </main>
  )
}

export default page