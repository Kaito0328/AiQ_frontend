import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface CollectionSet {
    id: number;
    name: string;
}

const CollectionSets: React.FC = () => {
    const [collectionSets, setCollectionSets] = useState<CollectionSet[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch("http://localhost:8080/api/collection-sets/user_collection_sets", {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data: CollectionSet[]) => setCollectionSets(data))
        .catch((error) => console.error("Error fetching collection sets:", error));
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">Your Collection Sets</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {collectionSets.map((set) => (
                    <li 
                        key={set.id} 
                        className="p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition"
                        onClick={() => navigate(`/collections/${set.id}`)}
                    >
                        {set.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CollectionSets;
