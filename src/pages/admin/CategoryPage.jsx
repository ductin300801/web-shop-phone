import React from 'react'
import CategoryTitle from '../../components/admin/Category/CategoryTitle'
import CategoryTable from '../../components/admin/Category/CategoryTable'
import { Box } from '@chakra-ui/react'

function CategoryPage() {
    return (
        <Box>
            <CategoryTitle />
            <Box width="100%" marginTop="24px">
                <CategoryTable />
            </Box>
        </Box>
    )
}

export default CategoryPage