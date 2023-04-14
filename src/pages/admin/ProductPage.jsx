

import { Box } from '@chakra-ui/react'
import React from 'react'
import ProductTitle from '../../components/admin/Product/ProductTitle'
import ProductTable from '../../components/admin/Product/ProductTable'

function ProductPage() {
    return (
        <Box>
            <ProductTitle />
            <Box>
                <ProductTable />
            </Box>
        </Box>
    )
}

export default ProductPage