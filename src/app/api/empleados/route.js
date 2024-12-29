import { NextResponse } from 'next/server'
import { employeeService } from '@/services/employeeService'

export async function GET() {
    try {
        const empleados = await employeeService.getAll()
        return NextResponse.json(empleados)
    } catch (error) {
        return NextResponse.json(
            { error: 'Error fetching empleados' },
            { status: 500 }
        )
    }
}

export async function POST(request) {
    try {
        const empleado = await request.json()
        const newEmpleado = await employeeService.create(empleado)
        return NextResponse.json(
            newEmpleado,
            { status: 201 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: 'Error creating empleado' },
            { status: 500 }
        )
    }
}